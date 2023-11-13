import { Fragment } from "react"
import List from "../components/List"
import ListItem from "../components/ListItem"
import { Enano } from "../types"
import useInput from "../utils/hooks/useInput"
import inputtxt from "./input.txt"
import resolution from "./resolution"

function Index() {
  const [enanos, bestEnanosNames, bestEnanosTotal] =
    useInput(resolution, inputtxt) ?? []

  function handleFilter(list: Enano[]) {
    return list.filter((enano) => bestEnanosNames.includes(enano.name))
  }

  return enanos && bestEnanosNames && bestEnanosTotal ? (
    <List
      list={enanos}
      renderer={(item) => (
        <Fragment key={item.name}>
          <ListItem
            item={item}
            classes={
              bestEnanosNames.includes(item.name) ? "border-red-300" : ""
            }
          />
        </Fragment>
      )}
      filterBtnText={"show best enanos"}
      filterBtnText2={"show every enano"}
      filterFn={handleFilter}
      filterTitle2={`The top 3 enanos collected ${bestEnanosTotal}`}
    />
  ) : (
    <></>
  )
}

export default Index
