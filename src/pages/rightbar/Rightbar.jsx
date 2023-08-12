import FeatedInfo from '../../components/featedInfo/FeatedInfo'
import FeatedList from '../../components/featedList/FeatedList'
import FeatedView from '../../components/featedView/FeatedView'
import './rightbar.scss'

const Rightbar = () => {
  return (
    <>
      <div className="rightbar">
        <FeatedInfo/>
        <div className="right-wrapper">
          <FeatedList/>
        </div>
      </div>
    </>
  )
}

export default Rightbar