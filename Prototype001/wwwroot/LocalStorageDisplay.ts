declare var DotNet;

class LocalStorageDisplay {
    refresh(dotnetHelper) {
        let list = document.querySelector('#local-storage-display-list tbody');
        list.innerHTML = '';
        
        Object
            .keys(localStorage)
            .sort()
            .forEach((value: string) => {
                const _value = value;
                
                let item = localStorage.getItem(value);
                let row = document.createElement('tr');
                
                let nameCol = document.createElement('td');
                nameCol.innerText = value;
                
                let contentCol = document.createElement('td');
                contentCol.innerText = item;
                
                let actionCol = document.createElement('td');
                let removeButton = document.createElement('button');
                removeButton.type = 'button';
                removeButton.className = 'btn btn-primary';
                removeButton.innerText = 'Delete';
                removeButton.onclick = () => {
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
    }
}

(window as any).localStorageDisplay = new LocalStorageDisplay();