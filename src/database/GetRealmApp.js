import { BookSchema } from "../schemas/BookSchema"
import Realm from "realm";

export const realm = await Realm.open({
    schema: [BookSchema],
});