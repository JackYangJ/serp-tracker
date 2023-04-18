"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexPage = void 0;
async function indexPage(ctx) {
    const title = 'admin page';
    await ctx.render('admin', {
        title,
    });
}
exports.indexPage = indexPage;
