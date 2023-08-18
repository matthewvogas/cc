import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import * as XLSX from 'xlsx'

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then(res => res.json())

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function excelToJson(excelFile: File): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = event => {
      const data = event.target?.result
      const workbook = XLSX.read(data, { type: 'binary' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(sheet, {
        blankrows: false,
        raw: false,
      })
      const links = jsonData.map((row: any) => row.links || row.Links)
      resolve(links)
    }
    reader.onerror = event => {
      reject(event.target?.error)
    }
    reader.readAsBinaryString(excelFile)
  })
}
