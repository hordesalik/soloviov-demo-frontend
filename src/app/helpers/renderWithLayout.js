export function renderWithLayout(res, view, viewData, layoutData, layout = 'layout') {
    res.render(view, viewData, function (err, html) {
        res.render(layout, {
            ...layoutData,
            pageContent: html
        });
    });
}
