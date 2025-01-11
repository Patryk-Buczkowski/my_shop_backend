import mongoose, { SchemaTypes } from "mongoose";
import { ActionType } from "src/types/actionType";



const createRandomDate = (start: string, end: string): string => {
  const startDate = new Date(start).getTime();
  const endDate = new Date(end).getTime();
  const randomDate = new Date(
    startDate + Math.random() * (endDate - startDate)
  );

  return randomDate.toISOString().split("T")[0];
};

const schema = mongoose.Schema;

const action = new schema<ActionType>({
  weddingDate: {
    type: String,
    unique: true,
    default: function () {
      return createRandomDate("1990-01-01", new Date(Date.now()).toString());
    },
  },
  divorce: {
    type: String,
    unique: true,
    default: function (this) {
      const wedDay = new Date(this.weddingDate).getTime();
      const day = 24 * 60 * 60 * 1000;
      const seeYaDay = new Date(wedDay + 26 * day);

      return seeYaDay.toISOString().split("T")[0];
    },
  },

  userId: {
    type: SchemaTypes.ObjectId,
    ref: "user",
    required: [true, "User is not defined"],
  },
});

const Action = mongoose.model("action", action);

export default Action;
