//= require esPhinx/ui/main

esPhinx.loader.loadPath("esPhinx");
require("observer");
esPhinx.loader.loadPath("esPhinx");
require("ajax");

(function ($module) {
    "use strict";

    // closure (private static)
    // para que filque "multi tarefa, talvez tenhamos de mover esses closures para um atributo de instância e guardar um array de instâncias (classe singleton) com o handle como identificador"
    var
        self,
        wrapperModal,
        modalMask,
        modal,
        header,
        headerActions,
        btnClose,
        content,
        btnHide;

    $module.extend({
        modal: function () {

            if (!(this instanceof esPhinx.ui.modal)) {
                if (!self) {
                    return new esPhinx.ui.modal(arguments[0]);
                } else {
                    self = this;
                }
            }

            var
                args = arguments[0],
                $ = jQuery,
                body = $("body"),
                time = 0,

                setButtonsAction = function () {

                    $(document).off("keydown").on("keydown", function (e) {
                        if (e.keyCode === 27) {
                            self.hide();
                        }
                    });

                    btnHide.click(function () {
                        self.hide();
                    });

                    btnClose.click(function () {
                        self.close();
                    });

                },

                observeContent = function () {
                    esPhinx(content[0]).observe({
                        config: {
                            childList: true
                        },
                        done: function () {
                            modal.centralizeOn($(document));
                        }
                    });
                },

                create = function () {
                    wrapperModal = $("<div></div>")
                        .addClass("esphinx-ui-wrapper-modal");
                    modalMask = $("<div></div>")
                        .addClass("esphinx-ui-modal-mask basicss-fixed basicss-transparent");
                    modal = $("<div></div>").addClass("esphinx-ui-modal basicss-hidden");
                    header = $("<div></div>").addClass("esphinx-ui-modal-header");
                    headerActions = $("<div></div>").addClass("esphinx-ui-modal-header-actions");
                    btnClose = $("<a href=\"#\"></a>")
                        .addClass("esphinx-ui-modal-btn-close button");
                    btnHide = $("<a href=\"#\"></a>")
                        .addClass("esphinx-ui-modal-btn-hide button");
                    content = $("<div></div>").addClass("esphinx-ui-modal-content");

                    body.append(wrapperModal);

                    wrapperModal
                        .append(modalMask)
                        .append(modal);

                    modal
                        .append(header)
                        .css({
                            "max-height": $(window).height(),
                            "max-width": $(document).width()
                        });

                    header.append(headerActions);

                    headerActions.append(btnClose);
                    headerActions.append(btnHide);

                    modal.append(content);

                    setButtonsAction();

                    observeContent();

                    if (args.url) {
                        esPhinx.ajax.get({
                            url: args.url,
                            readyStateChange: function (xhr) {
                                if (args.load) {
                                    args.load(modal, xhr);
                                }
                            }
                        }).done(function (answer) {
                            content.append(answer);
                            self.show();
                        });
                    }

                };

            // o handle deverá ser usado neste teste
            if ($(".esphinx-ui-wrapper-modal").length === 0) {
                create();
            } else {
                self.show();
            }

            // global scope (public)
            this.close = function () {
                modal.hide();

                modalMask.replaceToggleClass("basicss-transparent", "basicss-opacity-transition");

                time = parseFloat(
                    modalMask.css("transition-duration")
                ) * 1000;
                setTimeout(function () {
                    wrapperModal.remove();
                }, time);
            };

            this.hide = function () {
                modal.hide();

                modalMask.replaceToggleClass("basicss-transparent", "basicss-opacity-transition");

                wrapperModal.css("zIndex", -1);

            };

            this.show = function () {
                wrapperModal.css("zIndex", 0);
                modalMask
                    .replaceToggleClass("basicss-transparent",
                        "basicss-opacity-transition");
                modal.show();
            };

            return self;
        }
    });

}(esPhinx.ui));