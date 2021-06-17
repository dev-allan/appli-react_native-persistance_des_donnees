export const BookSchema = {
  name: "Book",
  properties: {
    _id: "objectId",
    author: "string?",
    category: "string?",
    title: "string?",
  },
  primaryKey: '_id',
};

export const CategorySchema = {
  name : "Category",
  properties: {
    _id: "objectId",
    category: "string",
  },
  primaryKey: "_id",
}