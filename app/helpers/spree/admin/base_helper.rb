module Spree
  module Admin
    module BaseHelper
      def field_container(model, method, options = {}, &block)
        css_classes = options[:class].to_a
        css_classes << 'field'
        if error_message_on(model, method).present?
          css_classes << 'withError'
        end
        content_tag(:div, capture(&block), class: css_classes.join(' '), id: "#{model}_#{method}_field")
      end

      def error_message_on(object, method, _options = {})
        object = convert_to_model(object)
        obj = object.respond_to?(:errors) ? object : instance_variable_get("@#{object}")

        if obj && obj.errors[method].present?
          errors = safe_join(obj.errors[method], "<br />".html_safe)
          content_tag(:span, errors, class: 'formError')
        else
          ''
        end
      end

      def admin_hint(title, text)
        content_tag(:span, class: 'hint-tooltip', title: title, data: { content: text }) do
          content_tag(:i, '', class: 'fa fa-info-circle')
        end
      end

      def datepicker_field_value(date)
        unless date.blank?
          l(date, format: Spree.t('date_picker.format', default: '%Y/%m/%d'))
        end
      end

      def preference_field_tag(name, value, options)
        case options[:type]
        when :integer
          text_field_tag(name, value, preference_field_options(options))
        when :boolean
          hidden_field_tag(name, 0, id: "#{name}_hidden") +
            check_box_tag(name, 1, value, preference_field_options(options))
        when :string
          text_field_tag(name, value, preference_field_options(options))
        when :password
          password_field_tag(name, value, preference_field_options(options))
        when :text
          text_area_tag(name, value, preference_field_options(options))
        else
          text_field_tag(name, value, preference_field_options(options))
        end
      end

      def preference_field_for(form, field, options)
        case options[:type]
        when :integer
          form.text_field(field, preference_field_options(options))
        when :boolean
          form.check_box(field, preference_field_options(options))
        when :string
          form.text_field(field, preference_field_options(options))
        when :password
          form.password_field(field, preference_field_options(options))
        when :text
          form.text_area(field, preference_field_options(options))
        else
          form.text_field(field, preference_field_options(options))
        end
      end

      def preference_field_options(options)
        field_options = case options[:type]
                        when :integer
          { size: 10,
            class: 'input_integer' }
                        when :boolean
          {}
                        when :string
          { size: 10,
            class: 'input_string fullwidth' }
                        when :password
          { size: 10,
            class: 'password_string fullwidth' }
                        when :text
          { rows: 15,
            cols: 85,
            class: 'fullwidth' }
        else
          { size: 10,
            class: 'input_string fullwidth' }
        end

        field_options.merge!({
          readonly: options[:readonly],
          disabled: options[:disabled],
          size: options[:size]
        })
      end

      def preference_fields(object, form)
        return unless object.respond_to?(:preferences)
        fields = object.preferences.keys.map { |key|
          form.label("preferred_#{key}", Spree.t(key) + ": ") +
            preference_field_for(form, "preferred_#{key}", type: object.preference_type(key))
        }
        safe_join(fields, "<br />".html_safe)
      end

      def link_to_add_fields(name, target, options = {})
        name = '' if options[:no_text]
        css_classes = options[:class] ? options[:class] + " spree_add_fields" : "spree_add_fields"
        link_to_with_icon('plus', name, 'javascript:', data: { target: target }, class: css_classes)
      end

      # renders hidden field and link to remove record using nested_attributes
      def link_to_remove_fields(name, f, options = {})
        name = '' if options[:no_text]
        options[:class] = '' unless options[:class]
        options[:class] += 'no-text with-tip' if options[:no_text]
        url = f.object.persisted? ? [:admin, f.object] : '#'
        link_to_with_icon('trash', name, url, class: "spree_remove_fields #{options[:class]}", data: { action: 'remove' }, title: Spree.t('actions.remove')) + f.hidden_field(:_destroy)
      end

      def spree_dom_id(record)
        dom_id(record, 'spree')
      end

      def admin_layout(layout = nil)
        @admin_layout = layout if layout
        @admin_layout
      end

      private

      def attribute_name_for(field_name)
        field_name.tr(' ', '_').downcase
      end
    end
  end
end
