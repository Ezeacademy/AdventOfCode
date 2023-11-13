export class File {
  name: string
  size: number
  parent: Directory | null

  constructor(name: string, size: number, parent = null) {
    this.name = name
    this.size = size
    this.parent = parent
  }

  hasChildren() {
    return false
  }
}

export class Directory extends File {
  children: (Directory | File)[]
  isPart1: boolean
  isPart2: boolean

  constructor(name: string, size: number = 0, parent = null) {
    super(name, size, parent)
    this.isPart1 = false
    this.isPart2 = false
    this.children = []
  }

  hasChildren() {
    return this.children.length !== 0
  }

  getSize() {
    let size = 0
    for (let child of this.children) {
      if (child instanceof Directory) {
        size += child.getSize()
      } else {
        size += child.size
      }
    }
    this.size = size
    return size
  }
}

class FileSystem {
  root: Directory

  constructor(root: Directory) {
    this.root = root
  }

  *preOrderTraversal(file = this.root): Generator<File | Directory> {
    yield file
    if (file instanceof Directory && file.children.length) {
      for (let child of file.children) {
        if (child instanceof Directory) {
          yield* this.preOrderTraversal(child)
        } else {
          yield child
        }
      }
    }
  }

  public getDirectories() {
    return [...this.preOrderTraversal()].filter(
      (element) => element instanceof Directory
    )
  }

  public insert(file: File) {
    if (file instanceof Directory) {
      this.insertDirectory(file)
    } else {
      this.insertFile(file)
    }
  }

  private insertDirectory(directory: Directory) {
    const parent = directory.parent || this.root
    parent.children.push(directory)
    directory.parent = parent
  }

  private insertFile(file: File) {
    const parent = file.parent || this.root
    parent.children.push(file)
    file.parent = parent
  }
}

export default function (input: string): [number, number, FileSystem] {
  const inputLines = input.split("\n")
  let fileSystem: FileSystem = new FileSystem(new Directory("/"))
  let prevDir: Directory | null = null
  let currentDir: Directory | null = null
  let newDir: Directory
  let root: Directory

  function handleCommand(command: string, argument: string) {
    if (argument !== "..") {
      prevDir = currentDir
      newDir = new Directory(argument as string)
      if (prevDir) {
        newDir.parent = prevDir
      }
      currentDir = newDir
      fileSystem.insert(newDir)
      return
    } else {
      if (currentDir) {
        currentDir = currentDir.parent
        prevDir = currentDir?.parent || root
      }
      return
    }
  }

  inputLines.forEach((line, idx) => {
    // We assume that the input always starts with $ cd /
    if (idx === 0) return

    const lineParts = line.split(" ")

    if (line.match(/^(\$ cd)/)) {
      handleCommand(lineParts[1], lineParts[2])
      return
    }

    if (line.match(/^\d/)) {
      const size = lineParts[0]
      const name = lineParts[1]
      const newFile = new File(name, Number(size))
      if (currentDir) newFile.parent = currentDir
      fileSystem.insert(newFile)
    }
  })

  function getDirsOfSize(
    operator: "<=" | ">=",
    targetSize: number,
    root: Directory
  ) {
    let filteredDirs: Directory[] = []

    function compareSize(number: number) {
      if (operator === "<=") return number <= targetSize
      if (operator === ">=") return number >= targetSize
    }

    function filterChildren(parent: Directory) {
      for (let child of parent.children) {
        if (child instanceof Directory) {
          if (compareSize(child.size)) {
            filteredDirs.push(child)
            child.hasChildren() && filterChildren(child)
          } else if (child.hasChildren()) {
            filterChildren(child)
          }
        }
      }
    }

    filterChildren(root)
    return filteredDirs
  }

  fileSystem.root.getSize()

  const MAX_DIR_SIZE = 100000
  const part1Dirs = getDirsOfSize("<=", MAX_DIR_SIZE, fileSystem.root)
  part1Dirs.forEach((dir) => (dir.isPart1 = true))

  const part1Result = part1Dirs.reduce((acc, curr) => {
    return (acc += curr.size)
  }, 0)

  const TOTAL_SPACE = 70000000
  const USED_SPACE = fileSystem.root.size
  const REQUIRED_SPACE = 30000000
  const SPACE_TO_FREE = REQUIRED_SPACE - TOTAL_SPACE + USED_SPACE

  const part2Dirs = getDirsOfSize(">=", SPACE_TO_FREE, fileSystem.root)
  part2Dirs.forEach((dir) => (dir.isPart2 = true))

  const part2DirsSizes = part2Dirs.map((dir) => dir.size)
  const part2Result = Math.min(...part2DirsSizes)

  return [part1Result, part2Result, fileSystem]
}
