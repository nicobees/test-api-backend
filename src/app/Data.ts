import { Schema, model, Document } from 'mongoose'

export interface DataInterface {
  key: String
  value: String
  createdAt: Date
  counts: Number[]
}

export interface DataBaseDocument extends DataInterface, Document<DataInterface> {
  key: String
  createdAt: Date
  totalCount: number
}

const dataSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  key: String,
  value: String,
  createdAt: Date,
  counts: [{ type: Number }]
}, { collection: 'records' })

const dataModel = model<DataInterface & Document>('getir-case-study', dataSchema)

export default dataModel
