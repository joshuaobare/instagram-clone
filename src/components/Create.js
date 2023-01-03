import { Dialog , DialogContent , DialogTitle } from "@mui/material"
import {ReactComponent as UploadSvg} from "../images/icons/UploadImage.svg"
import "../Create.css"

export default function Create(props) {
    return (        
            <Dialog open={props.dialogOpen ? true : false}>
                <DialogTitle>Create a Post</DialogTitle>
                <DialogContent>
                    
                    <form action="" >
                        <label className="image-input" htmlFor="image-input">
                            <div>Upload Picture</div>
                            <UploadSvg />                    
                            <input type="file"
                                    id="image-input"
                                    accept="image/jpeg, image/png"
                                    onChange={props.handleChange}
                                    style={{display:"none"}} />
                        </label>
                        
                        <label htmlFor="caption">Caption</label>
                        <textarea name="caption" id="caption" cols="30" rows="10"></textarea>
                        <button onClick={(e) => {
                            props.toggleDialog(e)
                            props.createPost(e)}}>Submit</button>
                    </form>
                    
                </DialogContent>                
            </Dialog>            
            
        
    )
}