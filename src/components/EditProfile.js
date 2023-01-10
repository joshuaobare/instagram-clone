import { Dialog , DialogContent , DialogTitle } from "@mui/material"

export default function EditProfile(props){
    return (
        <Dialog>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent>
                <form action="" className="form-edit-profile">
                    <div>
                        <label htmlFor=""></label>
                        <input type="text" />
                        
                    </div>
                    <div>
                        <label htmlFor="">Name</label>
                        <input type="text" />
                        
                    </div>
                    <div>
                        <label htmlFor="">Username</label>
                        <input type="text" />
                        
                    </div>
                    <div>
                        <label htmlFor="">Bio</label>
                        <textarea name="" id="" cols="30" rows="10" />
                    </div>


                </form>
            </DialogContent>
            
        </Dialog>

            
       

    )
}