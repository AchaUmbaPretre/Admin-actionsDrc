import FeatedInfo from '../../components/featedInfo/FeatedInfo'
import FeatedList from '../../components/featedList/FeatedList'
import './rightbar.scss'

const Rightbar = () => {
  return (
    <>
      <div className="rightbar">
        <FeatedInfo/>
        <FeatedList/>
      </div>
    </>
  )
}

export default Rightbar