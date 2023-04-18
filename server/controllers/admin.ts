export async function indexPage( ctx: any ) {
  const title = 'admin page'
  await ctx.render('admin', {
    title,
  })
}