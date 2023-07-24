import './featedInfo.scss'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const FeatedInfo = () => {
  return (
    <>
        <div className="featedInfo">
            <h2 className="feated-title">Menu</h2>
            <div className="feated-rows">
                <div className="feated-row">
                    <div className="feated-top">
                        <div className="feated-row-title">
                            <h3 className="feated-h2">Personnel</h3>
                            <span className="feated-span">4</span>
                        </div>
                        <div className="feated-right">
                            <PersonOutlineIcon/>
                        </div>
                    </div>
                    <div className="feated-bottom">
                        <span>*************************</span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default FeatedInfo