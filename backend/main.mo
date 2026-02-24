import Map "mo:core/Map";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

  module Score {
    public func compare(s1 : Score, s2 : Score) : Order.Order {
      Nat.compare(s1.moves, s2.moves);
    };
  };

  type Score = {
    player : Principal;
    moves : Nat;
  };

  let bestScores = Map.empty<Principal, Score>();

  public shared ({ caller }) func recordScore(moves : Nat) : async () {
    let currentBest = bestScores.get(caller);
    let needsUpdate = switch (currentBest) {
      case (null) { true };
      case (?score) { moves < score.moves };
    };
    if (needsUpdate) {
      bestScores.add(caller, { player = caller; moves });
    };
  };

  public query ({ caller }) func getBestScore() : async Nat {
    switch (bestScores.get(caller)) {
      case (null) { Runtime.trap("No score found for this player") };
      case (?score) { score.moves };
    };
  };
};
