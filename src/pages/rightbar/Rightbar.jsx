import FeatedInfo from '../../components/featedInfo/FeatedInfo'
import FeatedList from '../../components/featedList/FeatedList'
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