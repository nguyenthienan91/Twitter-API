type Handle = () => Promise<string>
const myName: string = 'Nguyễn Thiên Ân'

const handle: Handle = () => Promise.resolve(myName)

handle().then(console.log)
