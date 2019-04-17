/* jshint esversion:6 */

class Categories {
    constructor(select, list, addInput, addButton, saveButton, onSaveCallback) {
        this.categories = [];
        this.select = $(select);
        this.list = $(list);
        this.addInput = $(addInput);
        this.addButton = $(addButton);
        this.saveButton = $(saveButton);
        this.onSaveCallback = onSaveCallback;

        this.list.on('click', '.remove-button', (e) => {
            this.removeCategory($(e.target).data('id'));
            return false;
        });

        this.addButton.click(() => {
            this.addCategory(this.addInput.val());
            this.addInput.val('');
            return false;
        });

        this.saveButton.click(() => {
            this.saveCategories();
        });
    }

    addCategory(name) {
        this.categories.push(name);
        this.render();
    }

    removeCategory(id) {
        this.categories.splice(id, 1);
        this.render();
    }

    addCategories(data) {
        this.categories = data;
        this.render();
    }

    saveCategories() {
        this.onSaveCallback();
        this.render();
    }

    render() {
        this.select.empty();
        this.list.empty();
        this.categories.forEach((category, index) => {
            this.select.append('<option value="' + category + '">' + category + '</option>');
            this.list.append('<li class="list-group-item">' + category + '<a class="btn btn-outline-danger btn-sm float-right remove-button" href="#" data-id="' + index + '" role="button">Remove</a></li>');
        });
    }
}