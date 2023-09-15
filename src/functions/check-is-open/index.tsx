import { fetchTimeTable } from '@/services/firebase/firestore'

export async function CheckisOpenStore() {
  function GetCurrentTime() {
    const dayOfWeek = [
      'domingo',
      'segunda',
      'terca',
      'quarta',
      'quinta',
      'sexta',
      'sabado',
    ]

    const curentDate = new Date()
    const indexDayOfWeek = curentDate.getDay()
    const translateDayOfWeek = dayOfWeek[indexDayOfWeek]

    const currentHours = curentDate.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })

    return {
      diaDaSemana: translateDayOfWeek,
      horaAtual: currentHours,
    }
  }

  const timetables = await fetchTimeTable()
  const dataTime = GetCurrentTime()
  const currentDay = dataTime.diaDaSemana
  const currentHours = dataTime.horaAtual
  let result = false

  if (timetables) {
    let open = timetables[`${currentDay}_abertura`]
    let closed = timetables[`${currentDay}_fechamento`]

    if (open === 'fechado') return false

    if (closed === '00:00') closed = '24:00'

    if (currentHours >= open && currentHours <= closed) {
      result = true
    } else {
      result = false
    }
  }

  return result
}
