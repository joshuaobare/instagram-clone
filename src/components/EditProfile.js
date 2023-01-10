import { Dialog , DialogContent , DialogTitle } from "@mui/material"
import "../EditProfile.css"

export default function EditProfile(props){
    return (
        <Dialog open={props.dialogOpen ? true : false}>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent>
                <form action="" className="form-edit-profile">
                    <div className="form-edit-profile-item">
                        <div className="form-edit-profile-item-title form-edit-img-container">
                         <img src={props.userData.profilePicture} alt="user's profile" className="form-edit-profile-img" />
                        </div>
                        
                        <div>
                            <div>{props.userData.username}</div>
                            <div>Change profile picture</div>
                        </div>
                    
                        
                    </div>
                    <div className="form-edit-profile-item">
                        <label htmlFor="form-edit-profile-name" className="form-edit-profile-item-title">Name</label>
                        <input type="text" value = {props.userData.name} id="form-edit-profile-name"/>
                        
                    </div>
                    <div className="form-edit-profile-item">
                        <label htmlFor="form-edit-profile-username" className="form-edit-profile-item-title">Username</label>
                        <input type="text" value = {props.userData.username} disabled id="form-edit-profile-username"/>
                        
                    </div>
                    <div className="form-edit-profile-item">
                        <label htmlFor="form-edit-profile-description" className="form-edit-profile-item-title">Bio</label>
                        <textarea name="" id="form-edit-profile-description" value = {props.userData.description} />
                    </div>
                    <button className="form-edit-profile-button">Submit</button>


                </form>
            </DialogContent>
            
        </Dialog>

            
       

    )
}