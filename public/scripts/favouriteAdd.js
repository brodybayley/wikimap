$(() => {
    const userId = 2;
    const mapId = 2;
    $('#add-to-favourites').on('click', event => {
        $.post({
            url: `/users/${userId}/favourites`,
            data: { userId, mapId }
        }
        )
            .then(() => { })
            .catch(() => { })
    })
})

//require in head