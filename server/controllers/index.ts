export default async ( ctx: any ) => {
  const title = 'home'
  await ctx.render('index', {
    title
  })
}