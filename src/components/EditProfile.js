import { Dialog, DialogTitle } from "@mui/material";
import "../styles/EditProfile.css";
import { Close } from "@mui/icons-material";

export default function EditProfile(props) {
  
  const style = {
    display:"flex" ,
    alignItems : "center",
    justifyContent: "space-between"
  }
  
  return (
    <Dialog open={props.dialogOpen ? true : false}>
      <DialogTitle style={style}>
        <div>Edit Profile</div>
        <div onClick={props.toggleEditDialog} className="edit-profile-close-icon"><Close /></div>
      </DialogTitle>      
        <form action="" className="form-edit-profile">
          <div className="form-edit-profile-item">
            <div className="form-edit-profile-item-title form-edit-img-container">
              <img
                src={props.profileEdits.profilePicture}
                alt="user's profile"
                className="form-edit-profile-img"
              />
            </div>

            <div>
              <div>{props.profileEdits.username}</div>
              <div>Change profile picture</div>
            </div>
          </div>
          <div className="form-edit-profile-item">
            <label
              htmlFor="form-edit-profile-name"
              className="form-edit-profile-item-title"
            >
              Name
            </label>
            <input
              name="name"
              type="text"
              value={props.profileEdits.name}
              id="form-edit-profile-name"
              onChange={props.handleProfileEdit}
            />
          </div>
          <div className="form-edit-profile-item">
            <label
              htmlFor="form-edit-profile-username"
              className="form-edit-profile-item-title"
            >
              Username
            </label>
            <input
              type="text"
              value={props.profileEdits.username}
              disabled
              id="form-edit-profile-username"
            />
          </div>
          <div className="form-edit-profile-item">
            <label
              htmlFor="form-edit-profile-description"
              className="form-edit-profile-item-title"
            >
              Bio
            </label>
            <textarea
              name="description"
              id="form-edit-profile-description"
              value={props.profileEdits.description}
              onChange={props.handleProfileEdit}
            />
          </div>
          <button
            className="form-edit-profile-button"
            onClick={props.editProfile}
          >
            Submit
          </button>
        </form>
      
    </Dialog>
  );
}
