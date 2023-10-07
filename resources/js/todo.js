import { initDateTimePicker } from "./datetimepicker";
import { buildTodoElBuilder, emptyListBuilder } from "./element-builder";
import { toastError, toastSuccess } from "./toast";

const formatError = (error) => {
    if (error.status === 422) {
        return error?.responseJSON?.errors?.map((err) => err?.msg).join("\n");
    }
    return error?.responseJSON?.error || error?.message;
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

const toggleLoader = (show = false) => {
    if (show) $('.loader-container').addClass('show-loader');
    else $('.loader-container').removeClass('show-loader');
};

$(function (e) {
    $("#add-form").submit(function (e) {
        e.preventDefault();
        toggleLoader(true);
        const name = $('#add-form input[name="name"]').val();
        const description = $('#add-form input[name="description"]').val();
        const deadline = $('#add-form input[name="deadline"]').val();
        $.ajax({
            url: "/api/v1/todos",
            type: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                name,
                description,
                deadline
            }),
            success: (_response) => {
                toggleLoader(false);
                toastSuccess("Item added to Todo list successfully.");
                clearModalForm("confirmAddModal");
                $(".filter-list").trigger("change");
            },
            error: (error) => {
                toggleLoader(false);
                toastError(formatError(error));
            }
        });
    });

    $(document).on("submit", ".edit-form", function (e) {
        e.preventDefault();
        toggleLoader(true);
        const id = $(this).find('input[name="id"]').val();
        const name = $(this).find('input[name="name"]').val();
        const description = $(this).find('input[name="description"]').val();
        const deadline = $(this).find('input[name="deadline"]').val();
        $.ajax({
            url: `/api/v1/todos/${id}`,
            type: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                name,
                description,
                deadline
            }),
            success: (_response) => {
                toggleLoader(false);
                toastSuccess("Item edited successfully.");
                clearModalForm(`confirmEditModal-${id}`);
                $(".filter-list").trigger("change");
            },
            error: (error) => {
                toggleLoader(false);
                toastError(formatError(error));
            }
        });
    });

    $(document).on("submit", ".delete-form", function (e) {
        e.preventDefault();
        toggleLoader(true);
        const id = $(this).find('input[name="id"]').val();
        $.ajax({
            url: `/api/v1/todos/${id}`,
            type: "DELETE",
            headers: {
                Accept: 'application/json'
            },
            success: (_response) => {
                toggleLoader(false);
                toastSuccess("Item deleted successfully.");
                clearModalForm(`confirmDeleteModal-${id}`);
                $(".filter-list").trigger("change");
            },
            error: (error) => {
                toggleLoader(false);
                toastError(formatError(error));
            }
        });
    });

    $(document).on("click", ".done-checkbox", function (e) {
        e.preventDefault();
        toggleLoader(true);
        const id = $(this).data("id");
        $(this).prop('disabled', true);
        $.ajax({
            url: `/api/v1/todos/change-status/${id}`,
            type: "PUT",
            headers: {
                Accept: 'application/json'
            },
            success: (response) => {
                toggleLoader(false);
                toastSuccess("Status changed successfully.");
                $(this).prop("checked", response.done);
                $(".filter-list").trigger("change");
                $(this).prop('disabled', false);
            },
            error: (error) => {
                toggleLoader(false);
                toastError(formatError(error));
                $(this).prop('disabled', false);
            }
        });
    });

    $(".filter-list").on("change", function (e) {
        e.preventDefault();
        toggleLoader(true);
        const selectedType = $(this).children("option:selected").val();
        $.ajax({
            url: `/api/v1/todos?type=${selectedType}`,
            type: "GET",
            headers: {
                Accept: 'application/json'
            },
            success: (response) => {
                toggleLoader(false);
                buildTodoList(response.data);
                initDateTimePicker();
            },
            error: (error) => {
                toggleLoader(false);
                toastError(formatError(error));
            }
        });
    });
});
