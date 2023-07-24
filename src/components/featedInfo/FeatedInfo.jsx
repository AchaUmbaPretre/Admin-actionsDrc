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
                            <span className="feated-span">50</span>
                        </div>
                        <div className="feated-right">
                            <PersonOutlineIcon className='feated-icon'/>
                        </div>
                    </div>
                    <div className="feated-bottom">
                        <span>*******  **********  ********</span>
                    </div>
                </div>

                <div className="feated-row">
                    <div className="feated-top">
                        <div className="feated-row-title">
                            <h3 className="feated-h2">Affectation</h3>
                            <span className="feated-span">10</span>
                        </div>
                        <div className="feated-right">
                            <PersonOutlineIcon className='feated-icon'/>
                        </div>
                    </div>
                    <div className="feated-bottom">
                        <span>*******  *********  *********</span>
                    </div>
                </div>

                <div className="feated-row">
                    <div className="feated-top">
                        <div className="feated-row-title">
                            <h3 className="feated-h2">Liste de congé</h3>
                            <span className="feated-span">05</span>
                        </div>
                        <div className="feated-right">
                            <PersonOutlineIcon className='feated-icon'/>
                        </div>
                    </div>
                    <div className="feated-bottom">
                        <span>*******  **********  ********</span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default FeatedInfo