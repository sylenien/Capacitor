import { observable } from 'mobx'

class Stats {
  @observable stats = []
  @observable statsAmount = 0
}

const StatsStore = new Stats()
export default StatsStore
