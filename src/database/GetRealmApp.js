import { BookSchema, CategorySchema } from "../schemas/BookSchema"
import Realm from "realm";


export const getRealm = async () => {
    try {
        const realm = await Realm.open({
            path: "BookDb",
            schema : [BookSchema],
            schemaVersion: 1
        });
        return realm
    } catch (err){
        console.error("Failed to open the realm", err.message);
    }
}