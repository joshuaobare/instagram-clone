import { Dialog , DialogContent , DialogTitle } from "@mui/material"
import {ReactComponent as UploadSvg} from "../images/icons/UploadImage.svg"
import "../Create.css"

export default function Create() {
    return (        
            <Dialog>
                <DialogTitle>Create a Post</DialogTitle>
                <DialogContent>
                    <div className="Create">
                        <form action="">
                            <label className="image-input" htmlFor="image-input">
                                <div>Upload Picture</div>
                                <UploadSvg />                    
                                <input type="file"
                                        id="image-input"
                                        accept="image/jpeg, image/png"
                                        style={{display:"none"}} />
                            </label>
                            
                            <label htmlFor="caption">Caption</label>
                            <textarea name="caption" id="caption" cols="30" rows="10"></textarea>
                            <button>Submit</button>
                        </form>
                    </div>
                </DialogContent>                
            </Dialog>            
            
        
    )
}