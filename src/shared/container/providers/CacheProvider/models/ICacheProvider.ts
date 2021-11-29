interface ICacheProvider {
  add(key: string, value: unknown): Promise<void>
  recover<T>(key: string): Promise<T | null>
  invalidade(key: string): Promise<void>
  invalidadePrefix(prefix: string): Promise<void>
}

export default ICacheProvider
