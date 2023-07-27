import './edit.scss'

const Edit = () => {
  return (
    <>
        <div className="edit">
            <div className="edit-wrapper">
                <div className="edit-title">
                    <h2 className="edit-h2">Edite</h2>
                </div>
                <form action="" className="formulaire-edit">
                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Nom*</label>
                            <input type="text" className="input-form" />
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Prenom*</label>
                            <input type="text" className="input-form" />
                        </div>
                    </div>

                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Email*</label>
                            <input type="text" className="input-form" />
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Adresse*</label>
                            <input type="text" className="input-form" />
                        </div>
                    </div>

                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Numero du pièce*</label>
                            <input type="text" className="input-form" />
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Type du pièce*</label>
                            <input type="text" className="input-form" />
                        </div>
                    </div>

                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Competence*</label>
                            <input type="text" className="input-form" />
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Certificat*</label>
                            <input type="text" className="input-form" />
                        </div>
                    </div>
                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Adresse*</label>
                            <input type="text" className="input-form" />
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Status*</label>
                            <input type="text" className="input-form" />
                        </div>
                    </div>
                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Date*</label>
                            <input type="Date" className="input-form" />
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Genre*</label>
                            <div className="edit-radio">
                                <input type="radio" id="Choice1" name="contact" value="homme" />
                                <label for="Choice1">Homme</label>

                                <input type="radio" id="Choice2" name="contact" value="femme" />
                                <label for="Choice2">Femme</label>
                            </div>
                        </div>
                    </div>
                    <button className="edit-btn">Edit</button>
                </form>
            </div>
        </div>

    </>
  )
}

export default Edit