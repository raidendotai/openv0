export const Chat = (
  <>
    <div className="chat chat-start space-y-1">
      <div className="placeholder chat-image avatar">
        <div className="bg-neutral-focus text-neutral-content w-10 rounded-full">
          <span>NH</span>
        </div>
      </div>
      <div className="chat-header space-x-1">
        <span>Nathan</span>
      </div>
      <div className="chat-bubble">Follow me on GitHub!</div>
      <div className="chat-footer opacity-50">
        Delivered <time>12:45</time>
      </div>
    </div>
    <div className="chat chat-end space-y-1">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Profile" src="https://placeimg.com/192/192/people" />
        </div>
      </div>
      <div className="chat-bubble">Thank you!</div>
      <div className="chat-footer opacity-50">
        Seen at <time>12:46</time>
      </div>
    </div>
  </>
);
