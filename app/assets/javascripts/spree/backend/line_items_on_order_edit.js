// This file contains the code for interacting with line items in the manual cart
$(document).ready(function () {
    'use strict';

    // handle variant selection, show stock level.
    $('#add_line_item_variant_id').change(function(){
        var variant_id = $(this).val();

        var variant = _.find(window.variants, function(variant){
            return variant.id == variant_id
        })

        var variantLineItemTemplate = HandlebarsTemplates["variants/line_items_autocomplete_stock"];
        $('#stock_details').html(variantLineItemTemplate({variant: variant}));
        $('#stock_details').show();

        $('button.add_variant').click(addVariant);
    });
});

addVariant = function() {
    $('#stock_details').hide();

    var variant_id = $('input.variant_autocomplete').val();
    var total_quantity = 0;
    var stock_location_quantities = {};

    if ($(".stock-levels.untracked-inventory").length > 0) {
        total_quantity = $("input#variant_quantity").val();
    }
    else {
        var quantities = $("input.quantity[data-variant-id='" + variant_id + "']");

        quantities.each(function() {
            total_quantity += Number($(this).val());
            stock_location_quantities[$(this).attr('data-stock-location-id')] = $(this).val();
        });
    }

    adjustLineItems(order_number, variant_id, total_quantity, stock_location_quantities);
    return 1
}

adjustLineItems = function(order_number, variant_id, quantity, stock_location_quantities){
    var url = Spree.routes.orders_api + "/" + order_number + '/line_items';

    Spree.ajax({
        type: "POST",
        url: url,
        data: {
          line_item: {
            variant_id: variant_id,
            quantity: quantity,
            stock_location_quantities: stock_location_quantities
          },
        }
    }).done(function( msg ) {
        window.Spree.advanceOrder();
        window.location.reload();
    });

}
