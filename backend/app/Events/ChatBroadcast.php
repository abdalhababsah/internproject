<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChatBroadcast implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
    public $reciver;
    public $sender;
    public function __construct($message,$reciver,$sender)
    {
        $this->message=$message;
        $this->reciver=$reciver;
        $this->sender=$sender;
    }


    public function broadcastOn()
  {
    //   return ['my-channel'];
    return new PrivateChannel('chat.' . $this->reciver);
  }

  public function broadcastAs()
  {
      return 'my-event';
  }
}
