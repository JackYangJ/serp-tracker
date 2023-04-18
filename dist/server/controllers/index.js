"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (ctx) => {
    const title = 'home';
    await ctx.render('index', {
        title
    });
};
