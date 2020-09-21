var LocalStorageDisplay = /** @class */ (function () {
    function LocalStorageDisplay() {
    }
    LocalStorageDisplay.prototype.refresh = function (dotnetHelper) {
        var list = document.querySelector('#local-storage-display-list tbody');
        list.innerHTML = '';
        Object
            .keys(localStorage)
            .sort()
            .forEach(function (value) {
            var _value = value;
            var item = localStorage.getItem(value);
            var row = document.createElement('tr');
            var nameCol = document.createElement('td');
            nameCol.innerText = value;
            var contentCol = document.createElement('td');
            contentCol.innerText = item;
            var actionCol = document.createElement('td');
            var removeButton = document.createElement('button');
            removeButton.type = 'button';
            removeButton.className = 'btn btn-primary';
            removeButton.innerText = 'Delete';
            removeButton.onclick = function () {
                dotnetHelper.invokeMethodAsync("RemoveItem", _value);
                // or just this code
                // localStorage.removeItem(_value);
                // list.removeChild(row);   
            };
            actionCol.appendChild(removeButton);
            row.appendChild(nameCol);
            row.appendChild(contentCol);
            row.appendChild(actionCol);
            list.appendChild(row);
        });
    };
    return LocalStorageDisplay;
}());
window.localStorageDisplay = new LocalStorageDisplay();
