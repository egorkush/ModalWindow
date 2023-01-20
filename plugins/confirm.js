$.confirm = function(options) {
    return new Promise((resolve, reject) => {
        const modal = $.modal({
            title: options.title,
            width: '400px',
            closable: false,
            onClose() {
                modal.destroy()
            },
            content: options.content,
            footerButtons: [
                {text: 'Cancel', type: 'secondary', handler() {
                        // console.log('Primary btn clicked')
                        modal.close()
                        reject()
                    }},
                {text: 'Delete', type: 'danger', handler() {
                        // console.log('Primary btn clicked')
                        modal.close()
                        resolve()
                    }}
            ]
        })
        setTimeout(() => modal.open(), 0)
        // modal.open()
    })
}