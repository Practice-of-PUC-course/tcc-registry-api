import { getUser, getUserByTypeId } from '../model/user.dao.js';
import { getUserTypes } from '../model/usertype.dao.js';

const getUsers=async (id=null)=>{
    const users=await getUser(id).catch(
        (reason)=>{
            console.log("Failure on get user(s): "+reason);
            return false;
        }
    );
    return users;
};

const getUsersByTypeId=async (id=null)=>{
    const users=await getUserByTypeId(id).catch(
        (reason)=>{
            console.log("Failure on get user(s) by type: "+reason);
            return false;
        }
    );
    return users;
};

const getTypes=async (id=null)=>{
    const types=await getUserTypes(id).catch(
        (reason)=>{
            console.log("Failure on get user type(s): "+reason);
            return false;
        }
    );
    return types;
};

export{ getUsers, getUsersByTypeId, getTypes };