import * as XLSX from 'xlsx'

export function excelToJson(excelFile: File): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = event => {
      const data = event.target?.result
      const workbook = XLSX.read(data, { type: 'binary' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(sheet, {
        header: 2,
        blankrows: false,
      })
      resolve(jsonData)
    }
    reader.onerror = event => {
      reject(event.target?.error)
    }
    reader.readAsBinaryString(excelFile)
  })
}


type FormattedData = {
    username: string
    permalinks: string[]
}

export function formatExcelData(data: any[]) {
  let formattedData: FormattedData[] = []
  data.forEach((post: any) => {
    const [permalink, username] = Object.values(post) as string[]
    const existingUser = formattedData.find(user => user.username === username)
    if (existingUser) {
      existingUser.permalinks.push(permalink)
    } else {
      const newUser = {
        username: username,
        permalinks: [permalink],
      }
      formattedData.push(newUser)
    }
  })

  return formattedData
}
