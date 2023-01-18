import { Dialog , DialogContent , DialogTitle } from "@mui/material"
import { Close } from "@mui/icons-material"
import {ReactComponent as UploadSvg} from "../images/icons/UploadImage.svg"
import "../styles/Create.css"

export default function Create(props) {

    const style = {
        display:"flex",
        alignItems : "center",
        justifyContent: "space-between"
    }
    return (        
            <Dialog open={props.dialogOpen ? true : false}>
                <DialogTitle style = {style}>
                    <div>Create Post</div>
                    <button onClick={props.toggleDialog}
                    className="Create-close-icon">
                        <Close />
                    </button> 
                    
                </DialogTitle>
                
                <DialogContent>
                    
                    <form action="" className="form-create">
                        <label className="image-input" htmlFor="image-input">
                            <div className="image-input-header">Upload Picture</div>
                            <UploadSvg />                    
                            <input type="file"
                                    name = "pictureFile"
                                    id="image-input"
                                    accept="image/jpeg, image/png"
                                    onChange={props.handleChange}
                                    style={{display:"none"}} />
                        </label>
                        
                        <label htmlFor="caption" className="form-create-caption">Caption</label>
                        <textarea 
                                name="caption" 
                                id="caption" 
                                className="caption"
                                cols="30" 
                                rows="10"
                                value = {props.pictureData.caption}  
                                onChange={props.handleChange} 
                        />
                        <button 
                            className="form-create-button"
                            onClick={(e) => {
                                props.toggleDialog(e)
                                props.createPost(e)}}>Submit</button>
                    </form>
                    
                </DialogContent>                
            </Dialog>            
            
        
    )
}