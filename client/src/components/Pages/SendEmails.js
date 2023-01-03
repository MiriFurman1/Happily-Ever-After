import React from 'react'

export default function SendEmails() {
  return (
    
    <div className='EmailPage'>
      
      <form enctype="multipart/form-data" >
      <h3>Send updates to your guests</h3>
  <label for="subject">Subject:</label><br/>
  <input type="text" id="subject" name="subject"/><br/>
  <label for="body">Body:</label><br/>
  <textarea id="body" name="body"></textarea><br/>
  <label for="image">Image:</label><br/>
  <input type="file" id="image" name="image"/><br/>
  <input type="submit" value="Send Email"/>
</form>
    </div>
  )
}
