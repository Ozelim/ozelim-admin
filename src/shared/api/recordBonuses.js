import { pb } from "./pocketbase"

export async function createBonusRecord (variant, {...data}) {

  await pb.collection('user_bonuses').getOne(data?.to)
  .then(async res => {
    await pb.collection('user_bonuses').update(res?.id, {
      [variant]: [
        ...res?.withdraws,
        {
          id: crypto.randomUUID(),
          created: new Date(),
          referal: data?.who,
          sum: data?.sum,
        }
      ]
    })
  })
  .catch(async err => {
    console.log('catch code');
    await pb.collection('user_bonuses').create({
        id: data?.to,
        user: data?.to,
        [variant]: [{
          id: crypto.randomUUID(),
          created: new Date(),
          referal: data?.who,
          sum: data?.sum,
        }
      ]
    })
  })
}