import { buildTodoElBuilder, emptyListBuilder } from "./element-builder";
import { toastError, toastSuccess } from "./toast";

const formatError = (error) => {
    if (error.status === 422) {
        return error.responseJSON.errors.map((err) => err.msg).join("\n");
    }
    return error.message;
};

const buildTodoList = (todoList) => {
    if (todoList.length) {
        $("#todo-list").html(todoList.map(buildTodoElBuilder));
    } else {
        $("#todo-list").html(emptyListBuilder());
    }
};

const clearModalForm = (modalId) => {
    $(`#${modalId}`).modal("hide");
    $(".modal-backdrop").remove();
    $(`#${modalId} input`)?.val("");
};

$(function (e) {
    $("#add-form").submit(function (e) {
        e.preventDefault();
        const name = $('#add-form input[name="name"]').val();
        const description = $('#add-form input[name="description"]').val();
        const deadline = $('#add-form input[name="deadline"]').val();
        $.ajax({
            url: "/api/v1/todos",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                name,
                description,
                deadline
            }),
            success: (_response) => {
                toastSuccess("Item added to Todo list successfully.");
                clearModalForm("confirmAddModal");
                $(".filter-list").trigger("change");
            },
            error: (error) => {
                toastError(formatError(error));
            }
        });
    });

    $(document).on("submit", ".edit-form", function (e) {
        e.preventDefault();
        const id = $(this).find('input[name="id"]').val();
        const name = $(this).find('input[name="name"]').val();
        const description = $(this).find('input[name="description"]').val();
        const deadline = $(this).find('input[name="deadline"]').val();
        $.ajax({
            url: `/api/v1/todos/${id}`,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify({
                name,
                description,
                deadline
            }),
            success: (_response) => {
                toastSuccess("Item edited successfully.");
                clearModalForm(`confirmEditModal-${id}`);
                $(".filter-list").trigger("change");
            },
            error: (error) => {
                toastError(formatError(error));
            }
        });
    });

    $(document).on("submit", ".delete-form", function (e) {
        e.preventDefault();
        const id = $(this).find('input[name="id"]').val();
        $.ajax({
            url: `/api/v1/todos/${id}`,
            type: "DELETE",
            success: (_response) => {
                toastSuccess("Item deleted successfully.");
                clearModalForm(`confirmDeleteModal-${id}`);
                $(".filter-list").trigger("change");
            },
            error: (error) => {
                toastError(formatError(error));
            }
        });
    });

    $(document).on("click", ".done-checkbox", function (e) {
        e.preventDefault();
        const id = $(this).data("id");
        $.ajax({
            url: `/api/v1/todos/change-status/${id}`,
            type: "PUT",
            success: (response) => {
                toastSuccess("Status changed successfully.");
                $(this).prop("checked", response.done);
                $(".filter-list").trigger("change");
            },
            error: (error) => {
                toastError(formatError(error));
            }
        });
    });

    $(".filter-list").on("change", function (e) {
        e.preventDefault();
        const selectedType = $(this).children("option:selected").val();
        $.ajax({
            url: `/api/v1/todos?type=${selectedType}`,
            type: "GET",
            success: (response) => {
                buildTodoList(response.data);
            },
            error: (error) => {
                toastError(formatError(error));
            }
        });
    });
});
