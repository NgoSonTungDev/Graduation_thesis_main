import { IFavourite } from "./../types/favourite";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const favouriteSchema = new mongoose.Schema<IFavourite>({
  placeId: { type: Schema.Types.ObjectId, ref: "Place" },
  userId: {
    type: String,
    required: true,
  },
});

const Favourites = mongoose.model("Favourite", favouriteSchema);

export default Favourites;
