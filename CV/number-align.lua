function BulletList(el)
  -- Iterate through each item in the bullet list
  for i, item in ipairs(el.content) do
    -- Look inside the paragraph or plain text of the list item
    if #item > 0 and (item[1].t == "Para" or item[1].t == "Plain") then
      local inlines = item[1].content
      local last = inlines[#inlines]
      
      -- Check if the last element is a number (digits only)
      if last and last.t == "Str" and last.text:match("^%d+$") then
        local number_text = last.text
        
        -- 1. Remove the number from the end
        table.remove(inlines) 
        
        -- 2. Remove the trailing space if present
        if inlines[#inlines] and inlines[#inlines].t == "Space" then
          table.remove(inlines)
        end
        
        -- 3. Create a span with the class 'cv-number'
        local number_span = pandoc.Span(pandoc.Str(number_text), {class = "cv-number"})
        
        -- 4. Insert the number at the BEGINNING of the line
        -- (This makes 'float: right' work reliably on the same line)
        table.insert(inlines, 1, number_span)
      end
    end
  end
  return el
end
