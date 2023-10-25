import FeatedInfo from '../../components/featedInfo/FeatedInfo'
import FeatedList from '../../components/featedList/FeatedList'
import BarChartTotal from '../../components/BarChartTotal/BarChartTotal'
import './rightbar.scss'

const Rightbar = () => {
  return (
    <>
      <div className="rightbar">
        <FeatedInfo/>
        <div className="right-wrapper">
          <FeatedList/>
          <BarChartTotal/>
        </div>
      </div>
    </>
  )
}

export default Rightbar