import { ScenarioStats } from 'const/types'

export const createFilePromiseCollection = (files: FileList, loader: Function) => {
  const promises: Promise<ScenarioStats>[] = []

  Array.from(files).forEach((file, index) => {
    const filePromise = new Promise<ScenarioStats>((resolve) => {
      const reader = new FileReader()
      reader.readAsText((file as unknown) as Blob)
      reader.onload = () => {
        if (reader.result !== null) {
          const resultData = reader.result as string
          const scenarioStats = {
            name: file.name.match(/(.*).-.Challenge/i)![1],
            score: resultData.match(/Score:,(\d*)/i)![1],
            date: file.name.match(/Challenge.-.(.*).Stats/i)![1],
          }
          resolve(scenarioStats)
          loader(index + 1)
        }
        resolve({ name: 'null', score: 'null', date: 'null' })
      }
    })

    promises.push(filePromise)
  })

  return promises
}
