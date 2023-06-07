import { useDispatch } from "react-redux"
import { useCalendarStore, useUiStore } from "../../hooks"
import { addHours } from "date-fns"

export const FabAddNew = () => {

  const dispatch = useDispatch()

  const { openDateModal } = useUiStore()
  const { setActiveEvent } = useCalendarStore()

  const onClick = () => {
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: '#fafafa',
      user: {
        _id: 1,
        name: 'Luciano'
      }
    })
    dispatch(openDateModal())
  }

  return (
    <button
      className="btn btn-primary fab"
      onClick={onClick}
    >
      <i className="fas fa-plus"></i>
    </button>
  )
}