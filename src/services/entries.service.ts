import { Entry } from "@/store/calorieCounterSlice";
import api from "./api";

export async function getEntries() {
  return api.get('entry/all')
}

export async function addEntry(payload: Entry) {
  return api.post('entry/add', payload)
}

export async function editEntry(id:string, payload: Entry) {
  return api.put(`entry/edit/${id}`, payload)
}

export async function deleteEntry(id: string) {
  return api.remove(`entry/delete/${id}`)
}