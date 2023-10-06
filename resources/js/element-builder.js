import moment from 'moment';

export const emptyListBuilder = () => `
<tr>
    <td colspan="7" style="text-align: center">No Records found.</td>
</tr>`;

export const buildTodoElBuilder = (todo, index) => `
<tr>
    <th>${index + 1}</th>
    <td>${todo.name}</td>
    <td>${todo.description}</td>
    <td>${moment(todo.deadline).format('MMM Do YYYY, h:mm:ss a')}</td>
    <td>
        <div class="form-check">
            <input 
                class="form-check-input done-checkbox" 
                data-id="${todo.id}" 
                type="checkbox" 
                value="" 
                id="flexCheckDefault" 
                ${todo?.done ? "checked" : ""}
            />
        </div>
    </td>
    <td>
        <button 
            class="text-uppercase btn btn-light btn-sm p-1 me-2 edit-modal-form"  
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#confirmEditModal-${todo.id}">
            <i class="icofont-duotone icofont-apply"></i>Edit
        </button>
        ${editModalFormBuilder(todo)}
        <button type="button"
                class="btn btn-danger btn-sm p-1"
                data-bs-toggle="modal"
                data-bs-target="#confirmDeleteModal-${todo.id}">
            <i class="fa fa-trash"> </i>
            Delete
        </button>
        ${deleteModalFormBuilder(todo)}
    </td>
</tr>`;

export const editModalFormBuilder = (todo) => `
<div class="modal fade" id="confirmEditModal-${todo.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit Todo</h5>
                <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <form class="edit-form">
                <input type="hidden" class="form-control" name="id" value="${todo.id}" required>
                <div class="modal-body">
                    <div class="mb-3">
                      <label for="name" class="form-label">Name</label>
                        <span style="color: red">*</span>
                      <input type="text" class="form-control" id="name" name="name" value="${todo.name}" required>
                    </div>
                    <div class="mb-3">
                      <label for="description" class="form-label">Description</label>
                        <span style="color: red">*</span>
                      <input type="text" class="form-control" id="description" name="description" value="${todo.description}" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="deadline">Deadline</label>
                        <span style="color: red">*</span>
                        <input type="text" class="form-control" id="datetime" name="deadline"  value="${moment(todo.deadline).format('YYYY/MM/DD HH:mm')}" required>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary me-2 px-3" type="submit">Confirm</button>
                    <button class="btn btn-light px-3" type="button" data-bs-dismiss="modal">Close</button>
                </div>
              </form>
        </div>
    </div>
</div>`;

export const deleteModalFormBuilder = (todo) => `
<div class="modal fade" id="confirmDeleteModal-${todo.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Confirm Delete</h5>
                <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form class="delete-form">
                <div class="modal-body">
                    <input type="hidden" class="form-control" name="id" value="${todo.id}" required>
                    <p class="deleteDescription"><i class="icofont icofont-ui-delete"></i>Are you sure you want to delete this item from the list?</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary me-2 px-3" type="submit">Confirm</button>
                    <button class="btn btn-light px-3" type="button" data-bs-dismiss="modal">Close</button>
                </div>
            </form>
        </div>
    </div>
</div>
`